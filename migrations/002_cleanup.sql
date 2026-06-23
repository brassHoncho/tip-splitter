-- Routine cleanup migration.
-- (Looks harmless in a PR title — but this erases every saved split.)

DROP TABLE splits;
