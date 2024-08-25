import { getRandomItem } from "../utilities/randomElement";
import { client, pool } from "../db/pg";
import { Factoid } from "../models/factoid.model";

export const Factoids = {
  descriptors: [
    { id: 0, text: "choice" },
    { id: 1, text: "collectible" },
    { id: 2, text: "venerable" },
    { id: 3, text: "rare" },
    { id: 4, text: "mature" },
    { id: 5, text: "classical" },
    { id: 6, text: "uncommon" },
    { id: 7, text: "unique" },
    { id: 8, text: "unusual" },
    { id: 9, text: "extraordinary" },
    { id: 10, text: "artisanal" },
    { id: 11, text: "artisan" },
    { id: 12, text: "craft" },
    { id: 13, text: "hand-made" },
    { id: 14, text: "vintage" },
    { id: 15, text: "antique" },
    { id: 16, text: "reclaimed" },
    { id: 17, text: "bespoke" },
    { id: 18, text: "custom" },
    { id: 19, text: "exclusive" },
    { id: 20, text: "limited" },
    { id: 21, text: "premium" },
    { id: 22, text: "refined" },
    { id: 23, text: "special" },
    { id: 24, text: "superior" },
    { id: 25, text: "tailored" },
    { id: 26, text: "handcrafted" },
    { id: 27, text: "luxury" },
    { id: 28, text: "elite" },
    { id: 29, text: "prestigious" },
    { id: 30, text: "exquisite" },
    { id: 31, text: "handpicked" },
    { id: 32, text: "select" },
    { id: 33, text: "finest" },
    { id: 34, text: "curated" },
    { id: 35, text: "distinctive" },
    { id: 36, text: "exclusive" },
    { id: 37, text: "handcrafted" },
    { id: 38, text: "bespoke" },
    { id: 39, text: "customized" },
    { id: 40, text: "deluxe" },
    { id: 41, text: "elegant" },
    { id: 42, text: "exceptional" },
    { id: 43, text: "fancy" },
    { id: 44, text: "gourmet" },
    { id: 45, text: "high-end" },
    { id: 46, text: "limited-edition" },
    { id: 47, text: "luxurious" },
    { id: 48, text: "one-of-a-kind" },
    { id: 49, text: "prized" },
    { id: 50, text: "rare" },
    { id: 51, text: "select" },
    { id: 52, text: "sought-after" },
    { id: 53, text: "special-edition" },
    { id: 54, text: "top-tier" },
    { id: 55, text: "unique" },
  ],
  nouns: [
    { id: 0, text: "bottles" },
    { id: 1, text: "paper cups" },
    { id: 2, text: "straws" },
    { id: 3, text: "napkins" },
    { id: 4, text: "paper plates" },
    { id: 5, text: "forks" },
    { id: 6, text: "spoons" },
    { id: 7, text: "knives" },
    { id: 8, text: "disposable razors" },
    { id: 9, text: "toothpicks" },
    { id: 10, text: "bags" },
    { id: 11, text: "paper towels" },
    { id: 12, text: "wet wipes" },
    { id: 13, text: "cotton swabs" },
    { id: 14, text: "bandages" },
    { id: 15, text: "balloons" },
    { id: 16, text: "candy wrappers" },
    { id: 17, text: "coffee stirrers" },
    { id: 18, text: "lids" },
    { id: 19, text: "takeout containers" },
    { id: 20, text: "aluminum foils" },
    { id: 21, text: "cling films" },
    { id: 22, text: "disposable gloves" },
    { id: 23, text: "face masks" },
    { id: 24, text: "wraps" },
    { id: 25, text: "snack bags" },
    { id: 26, text: "fast food wrappers" },
    { id: 27, text: "paper napkins" },
    { id: 28, text: "cups" },
    { id: 29, text: "disposable lighters" },
    { id: 30, text: "combs" },
    { id: 31, text: "hangers" },
    { id: 32, text: "containers" },
    { id: 33, text: "trays" },
    { id: 34, text: "packagings" },
    { id: 35, text: "bottle caps" },
    { id: 36, text: "tubes" },
    { id: 37, text: "syringes" },
    { id: 38, text: "pipettes" },
    { id: 39, text: "test tubes" },
    { id: 40, text: "petri dishes" },
    { id: 41, text: "beakers" },
    { id: 42, text: "funnels" },
    { id: 43, text: "spatulas" },
    { id: 44, text: "droppers" },
    { id: 45, text: "vials" },
    { id: 46, text: "bottle caps" },
    { id: 47, text: "jars" },
    { id: 48, text: "buckets" },
    { id: 49, text: "basins" },
    { id: 50, text: "paper clips" },
    { id: 51, text: "staples" },
    { id: 52, text: "rubber bands" },
    { id: 53, text: "pins" },
    { id: 54, text: "thumbtacks" },
    { id: 55, text: "envelopes" },
    { id: 56, text: "notepads" },
    { id: 57, text: "sticky notes" },
    { id: 58, text: "folders" },
    { id: 59, text: "binders" },
    { id: 60, text: "index cards" },
    { id: 61, text: "highlighters" },
    { id: 62, text: "markers" },
    { id: 63, text: "erasers" },
    { id: 64, text: "pencils" },
    { id: 65, text: "pens" },
    { id: 66, text: "scissors" },
    { id: 67, text: "tape dispensers" },
    { id: 68, text: "glue sticks" },
    { id: 69, text: "paper fasteners" },
    { id: 70, text: "coffee filters" },
  ],
  verbs: [
    { id: 0, text: "repair" },
    { id: 1, text: "reassemble" },
    { id: 2, text: "remodel" },
    { id: 3, text: "refurbish" },
    { id: 4, text: "overhaul" },
    { id: 5, text: "repurposed" },
    { id: 6, text: "recycle" },
    { id: 7, text: "rehabilitate" },
    { id: 8, text: "refit" },
    { id: 9, text: "restore" },
    { id: 10, text: "modernize" },
    { id: 11, text: "retrofit" },
    { id: 12, text: "rejuvenate" },
    { id: 13, text: "recondition" },
    { id: 14, text: "craft" },
    { id: 15, text: "create" },
    { id: 16, text: "construct" },
    { id: 17, text: "rebuild" },
    { id: 18, text: "revamp" },
    { id: 19, text: "reconstruct" },
    { id: 20, text: "reengineer" },
    { id: 21, text: "reform" },
    { id: 22, text: "rework" },
    { id: 23, text: "restructure" },
    { id: 24, text: "reorganize" },
    { id: 25, text: "retool" },
    { id: 26, text: "recalibrate" },
    { id: 27, text: "reconfigure" },
    { id: 28, text: "redecorate" },
    { id: 29, text: "reinvigorate" },
    { id: 30, text: "replenish" },
    { id: 31, text: "recharge" },
    { id: 32, text: "reanimate" },
    { id: 33, text: "reignite" },
    { id: 34, text: "assemble" },
    { id: 35, text: "fabricate" },
    { id: 36, text: "forge" },
    { id: 37, text: "generate" },
    { id: 38, text: "invent" },
    { id: 39, text: "manufacture" },
    { id: 40, text: "mold" },
    { id: 41, text: "produce" },
    { id: 42, text: "sculpt" },
    { id: 43, text: "shape" },
    { id: 44, text: "synthesize" },
    { id: 45, text: "design" },
    { id: 46, text: "develop" },
    { id: 47, text: "engineer" },
    { id: 48, text: "formulate" },
    { id: 49, text: "innovate" },
    { id: 50, text: "model" },
    { id: 51, text: "plan" },
    { id: 52, text: "program" },
    { id: 53, text: "refine" },
    { id: 54, text: "renovate" },
    { id: 55, text: "revise" },
    { id: 56, text: "sketch" },
    { id: 57, text: "streamline" },
    { id: 58, text: "tailor" },
    { id: 59, text: "transform" },
    { id: 60, text: "upgrade" },
    { id: 61, text: "visualize" },
    { id: 62, text: "weld" },
    { id: 63, text: "compose" },
    { id: 64, text: "customize" },
    { id: 65, text: "devise" },
    { id: 66, text: "draft" },
    { id: 67, text: "erect" },
    { id: 68, text: "execute" },
    { id: 69, text: "form" },
    { id: 70, text: "frame" },
    { id: 71, text: "illustrate" },
    { id: 72, text: "initiate" },
    { id: 73, text: "integrate" },
    { id: 74, text: "orchestrate" },
    { id: 75, text: "plot" },
    { id: 76, text: "prepare" },
    { id: 77, text: "propose" },
    { id: 78, text: "realize" },
    { id: 79, text: "reformulate" },
    { id: 80, text: "reimagine" },
    { id: 81, text: "remake" },
  ],
};

export function getFactoid(): string {
  const verb = getRandomItem(Factoids.verbs);
  const adjective = getRandomItem(Factoids.descriptors);
  const noun = getRandomItem(Factoids.nouns);
  return `I ${verb.text} ${adjective.text} ${noun.text}.`;
}

export async function saveFactoid(factoid: Factoid): Promise<Factoid | unknown> {
  const queryText = `
    INSERT into FACTOIDS (factoid, createdDate, votes) VALUES($1, NOW(), 1)
    RETURNING *;
  `;
  try {
    const { rows } = await pool.query(queryText, [factoid.message]);
    return rows[0];
  } catch (error) {
    return error;
  }
}

export async function updateFactoidVote(factoid: Factoid, vote: 1 | -1): Promise<Factoid | null> {
  const queryText = `
    UPDATE factoids
    SET votes = $1 + votes
    WHERE factoid = $2
    RETURNING *;
  `;
  const values = [vote, factoid.message];
  try {
    const result = await pool.query(queryText, values);
    return result.rows[0];

  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPopularFactoids(queryLimit): Promise<Factoid[] | null> {
  const queryText = `
    SELECT * FROM factoids
    ORDER BY votes DESC
    LIMIT $1;
  `;
  try {
    const { rows } = await pool.query(queryText, [queryLimit]);
    return rows;  
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getNewestFactoids(queryLimit: number): Promise<Factoid[] | null> {
  const queryText = `
    SELECT * FROM factoids
    ORDER BY createdDate DESC
    LIMIT $1;
  `;
  try {
    const { rows } = await pool.query(queryText, [queryLimit]);
    return rows;
  } catch (error) {
    console.error(error);
    return null;
  }
}