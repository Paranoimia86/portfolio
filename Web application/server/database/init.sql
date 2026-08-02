
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    refresh_token TEXT,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'professor', 'admin')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    student_id_number VARCHAR(11),
    address TEXT,
    date_of_birth DATE,
    school VARCHAR(255),
    profile_photo VARCHAR(255),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exercise_groups (
    id SERIAL PRIMARY KEY,
    day VARCHAR(10) NOT NULL CHECK (day IN ('PO', 'UT', 'ST', 'STV', 'PIA')),
    time TIME NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_exercise_groups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_group_id INTEGER NOT NULL REFERENCES exercise_groups(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, exercise_group_id)
);

CREATE TABLE IF NOT EXISTS lectures (
    id SERIAL PRIMARY KEY,
    lecture_number INTEGER NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exercises (
    id SERIAL PRIMARY KEY,
    exercise_number INTEGER NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    introduction TEXT NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exercise_tasks (
    id SERIAL PRIMARY KEY,
    exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    task_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (exercise_id, task_number)
);

CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,
    assignment_number INTEGER NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    folder_structure TEXT,
    deadline TIMESTAMP NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    time_limit_minutes INTEGER NOT NULL,
    questions_to_display INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_by INTEGER NOT NULL REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS test_attempts (
    id SERIAL PRIMARY KEY,
    test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP,
    status VARCHAR(20) NOT NULL CHECK (
        status IN ('in_progress', 'submitted', 'graded')
    ),
    total_score NUMERIC(6,2),
    max_score NUMERIC(6,2),
    passed BOOLEAN,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS test_questions (
    id SERIAL PRIMARY KEY,
    test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(30) NOT NULL CHECK (
        question_type IN ('single_choice', 'multiple_choice', 'short_text', 'long_text')
    ),
    points NUMERIC(6,2) NOT NULL,
    requires_manual_review BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS question_options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES test_questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    option_order INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (question_id, option_order)
);

CREATE TABLE IF NOT EXISTS question_text_answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES test_questions(id) ON DELETE CASCADE,
    accepted_answer TEXT NOT NULL,
    case_sensitive BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attempt_questions (
    id SERIAL PRIMARY KEY,
    attempt_id INTEGER NOT NULL REFERENCES test_attempts(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL REFERENCES test_questions(id) ON DELETE CASCADE,
    display_order INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (attempt_id, question_id),
    UNIQUE (attempt_id, display_order)
);

CREATE TABLE IF NOT EXISTS student_answers (
    id SERIAL PRIMARY KEY,
    attempt_question_id INTEGER NOT NULL REFERENCES attempt_questions(id) ON DELETE CASCADE,
    answer_text TEXT,
    is_correct BOOLEAN,
    awarded_points NUMERIC(6,2),
    reviewed_by INTEGER REFERENCES users(id),
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_answer_options (
    id SERIAL PRIMARY KEY,
    student_answer_id INTEGER NOT NULL REFERENCES student_answers(id) ON DELETE CASCADE,
    option_id INTEGER NOT NULL REFERENCES question_options(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_answer_id, option_id)
);

CREATE TABLE IF NOT EXISTS student_test_access (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES users(id),
  test_id INT REFERENCES tests(id),
  UNIQUE(student_id, test_id)
);

CREATE TABLE IF NOT EXISTS lecture_tracking (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lecture_number INTEGER NOT NULL,
    opened_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP,
    time_spent_seconds INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_grades (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    homework_points NUMERIC(5,2) DEFAULT 0,
    exam_points NUMERIC(5,2) DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id)
);

CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    week_number INTEGER NOT NULL CHECK (week_number >= 1 AND week_number <= 13),
    attended VARCHAR(20) NOT NULL CHECK (attended IN ('yes', 'late', 'no')),
    excused BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, week_number)
);

INSERT INTO users (first_name, last_name, email, password_hash, role, is_active)
VALUES (
    'Admin',
    'System',
    'admin@admin.tuke.sk',
    '$2b$10$9Yu4tlqlx8OxqhYmZi4dA.LeY047K9OR0iVadYB8ZqoAPOR3ugklW',
    'admin',
    TRUE
);
