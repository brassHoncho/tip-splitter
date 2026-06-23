/* A migration: one small, versioned, reversible change to the database.
 *
 * The number prefix is a timestamp — it sets the ORDER migrations run in.
 * node-pg-migrate records which files it has applied in a tracking table
 * (`pgmigrations`), so each runs exactly once, everywhere, in order.
 */

exports.shorthands = undefined;

// up = apply the change.
exports.up = (pgm) => {
  // Add an optional free-text note column to the splits table.
  // (Translates to:  ALTER TABLE "splits" ADD "note" text; )
  pgm.addColumn("splits", {
    note: { type: "text", notNull: false },
  });
};

// down = undo the change (rollback). Migration tools let you reverse a step.
exports.down = (pgm) => {
  pgm.dropColumn("splits", "note");
};
