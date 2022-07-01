import * as mongoose from "mongoose";
import { MatchDoc } from "./matchModel";
import { PlayerDoc } from "./playerModel";
import { TeamDoc } from "./teamModel";

interface TournamentAttrs {
  name: string;
  key: string;
  awards: any;
  teams: Array<any>;
  players: Array<any>;
}

interface TournamentDoc extends mongoose.Document {
  name: string;
  key: string;
  awards: any;
  teams: Array<TeamDoc>;
  players: Array<PlayerDoc>;
  status: boolean;
  phases: Array<{
    name: string;
    key: string;
    teams: {
      teamDetail: TeamDoc;
      players: Array<{ playerDetail: PlayerDoc }>;
    };
    matches: Array<{ matchDetail: MatchDoc }>;
  }>;
}

interface TournamentModel extends mongoose.Model<TournamentDoc> {
  build(attrs: TournamentAttrs): TournamentDoc;
}

const TournamentSchema = new mongoose.Schema(
  {
    name: String,
    key: String,
    status: { type: Boolean, default: true },
    awards: mongoose.Schema.Types.Mixed,
    teams: [{ type: mongoose.SchemaTypes.ObjectId, ref: "teams" }],
    players: [{ type: mongoose.SchemaTypes.ObjectId, ref: "players" }],
    phases: [
      {
        name: String,
        key: String,
        teams: {
          teamDetail: { type: mongoose.SchemaTypes.ObjectId, ref: "teams" },
          players: [
            {
              playerDetail: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "players",
              },
            },
          ],
        },
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
TournamentSchema.statics.build = (attrs: TournamentAttrs) =>
  new Tournament(attrs);

export const Tournament = mongoose.model<TournamentDoc, TournamentModel>(
  "tournaments",
  TournamentSchema
);
