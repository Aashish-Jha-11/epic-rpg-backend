import { model, Schema } from "mongoose";
import {
  CharacterDocument,
  CharacterModelInterface,
  CharacterClass,
  CharacterRarity
} from "../interfaces/character.interface";

const characterStatsSchema = new Schema({
  health: { type: Number, required: true, min: 0 },
  attack: { type: Number, required: true, min: 0 },
  defense: { type: Number, required: true, min: 0 },
  speed: { type: Number, required: true, min: 0 },
  mana: { type: Number, required: true, min: 0 }
}, { _id: false });

const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Character ka naam toh chahiye!"],
      trim: true,
      minlength: [2, "Naam kam se kam 2 letters ka hona chahiye"],
      maxlength: [50, "Naam 50 letters se zyada nahi ho sakta"]
    },
    class: {
      type: String,
      enum: Object.values(CharacterClass),
      required: [true, "Class select karo bhai!"]
    },
    level: {
      type: Number,
      default: 1,
      min: [1, "Level 1 se kam nahi ho sakta"],
      max: [100, "Max level 100 hai boss!"]
    },
    experience: {
      type: Number,
      default: 0,
      min: 0
    },
    rarity: {
      type: String,
      enum: Object.values(CharacterRarity),
      default: CharacterRarity.COMMON
    },
    stats: {
      type: characterStatsSchema,
      required: true
    },
    skills: {
      type: [String],
      default: []
    },
    isActive: {
      type: Boolean,
      default: true
    },
    userId: {
      type: String,
      index: true
    }
  },
  {
    timestamps: true
  }
);

characterSchema.index({ name: "text" });
characterSchema.index({ class: 1, level: -1 });
characterSchema.index({ rarity: 1 });

const CharacterModel = model<CharacterDocument, CharacterModelInterface>(
  "Character",
  characterSchema
);

export default CharacterModel;
