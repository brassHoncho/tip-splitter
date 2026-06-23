-- The one table our app uses: a history of saved bill splits.
-- Run this ONCE in the Neon SQL editor to create it.
-- "IF NOT EXISTS" makes it safe to run more than once.

CREATE TABLE IF NOT EXISTS splits (
  id          BIGSERIAL     PRIMARY KEY,        -- auto-incrementing row id
  bill        NUMERIC(10,2) NOT NULL,           -- the bill amount
  tip_percent NUMERIC(5,2)  NOT NULL,           -- tip %
  people      INTEGER       NOT NULL,           -- how many people
  per_person  NUMERIC(10,2) NOT NULL,           -- computed amount each pays
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT now()  -- when it was saved
);
