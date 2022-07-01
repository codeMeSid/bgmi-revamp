import * as mongoose from "mongoose";
import { PlayerDoc } from "./playerModel";

interface TeamAttrs {
  name: string;
  src: string;
  key: string;
  shortName: string;
}

export interface TeamDoc extends mongoose.Document {
  name: string;
  shortName: string;
  src: string;
  key: string;
  status: boolean;
  matches: Array<{
    matchDetail: any;
    playerDetails: Array<{
      data: PlayerDoc;
      src: string;
      position: number;
      finishes: number;
      isAlive: boolean;
      onDate: {
        dead: Date;
      };
    }>;
  }>;
}

interface TeamModel extends mongoose.Model<TeamDoc> {
  build(attrs: TeamAttrs): TeamDoc;
}

const TeamSchema = new mongoose.Schema(
  {
    name: String,
    shortName: String,
    src: String,
    key: String,
    status: { type: Boolean, default: true },
    matches: [
      {
        matchDetail: { type: mongoose.SchemaTypes.ObjectId, ref: "Matches" },
        playerDetail: [
          {
            data: { type: mongoose.SchemaTypes.ObjectId, ref: "players" },
            src: String,
            position: Number,
            finishes: Number,
            isAlive: Boolean,
            onDate: {
              dead: Date,
            },
          },
        ],
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

TeamSchema.statics.build = (attrs: TeamAttrs) => new Team(attrs);

export const Team = mongoose.model<TeamDoc, TeamModel>("teams", TeamSchema);
