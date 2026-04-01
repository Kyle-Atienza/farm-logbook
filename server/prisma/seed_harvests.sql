-- Seed script: generate 3 months of mock `Harvest` data
-- Period: 2026-01-01 to 2026-03-31 (inclusive)
-- Behavior: most days have 2 harvests (morning & afternoon), with variation
-- loggedBy is set to 1 for all rows

DO $$
DECLARE
  d date;
  start_date date := '2026-01-01';
  end_date date := '2026-03-31';
  r float;
  n int;
  i int;
  ts timestamptz;
  qty double precision;
BEGIN
  FOR d IN SELECT generate_series(start_date, end_date, interval '1 day')::date LOOP
    -- Decide number of harvests for the day with weighted probabilities:
    -- 5% chance 0, 15% chance 1, 70% chance 2, 8% chance 3, 2% chance 4
    r := random();
    IF r < 0.05 THEN
      n := 0;
    ELSIF r < 0.20 THEN
      n := 1;
    ELSIF r < 0.90 THEN
      n := 2;
    ELSIF r < 0.98 THEN
      n := 3;
    ELSE
      n := 4;
    END IF;

    FOR i IN 1..n LOOP
      -- Schedule typical times for first two harvests, additional ones get random times
      IF i = 1 THEN
        ts := (d :: timestamptz) + interval '8 hours' + (floor(random() * 60) || ' minutes')::interval;
      ELSIF i = 2 THEN
        ts := (d :: timestamptz) + interval '15 hours' + (floor(random() * 60) || ' minutes')::interval;
      ELSE
        ts := (d :: timestamptz) + (interval '6 hours' + random() * interval '12 hours') + (floor(random() * 60) || ' minutes')::interval;
      END IF;

      -- Quantity: random float between 0 and 6000.0, two decimal places, with skewed distribution
      -- Use quadratic bias to favor lower volumes but allow occasional high output.
      qty := round(((random() * random()) * 6000.0)::numeric, 2)::double precision;

      INSERT INTO "Harvest" ("createdAt", "quantity", "loggedBy")
      VALUES (ts, qty, 1);
    END LOOP;
  END LOOP;
END$$;

-- End of seed script