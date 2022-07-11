import * as mongoose from "mongoose";
import { CustomError } from "../func/error";
import { DomainApi } from "../func/router/domainApi";
import { generateKey } from "../func/utils/generateKey";
import { Match, MatchStatus } from "../model/matchModel";
import { Tournament } from "../model/tournamentModel";

export const matchRoutes: Array<DomainApi> = [
  {
    url: "/get/:matchKey",
    method: "get",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { matchKey } = req.params;
      const match = await Match.findOne({ key: matchKey })
        .populate("teams.teamDetail", "key name src", "teams")
        .populate("teams.players.playerDetail", "key name src", "players");
      if (!match) throw new CustomError("BadRequestError", ["Match Not Found"]);
      res.json({ success: "true", payload: match });
    },
  },
  {
    url: "/add/:tournamentKey/:phaseKey",
    method: "post",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { tournamentKey, phaseKey } = req.params;
      const { name, teams, map } = req.body.payload;
      const tournament = await Tournament.findOne({ key: tournamentKey });
      if (!tournament)
        throw new CustomError("BadRequestError", ["Invalid Tournament Update"]);
      const newMatch = Match.build({
        name,
        awards: tournament.awards,
        key: generateKey(),
        map,
        teams: teams?.map((team: any) => ({
          teamDetail: new mongoose.Types.ObjectId(team.teamDetail.id),
          players: team?.players?.map((player: any) => ({
            playerDetail: new mongoose.Types.ObjectId(player.playerDetail.id),
          })),
        })),
        theme: null,
      });
      tournament.phases = tournament.phases.map((phase) => {
        if (phase.key === phaseKey)
          phase.matches.push({ matchDetail: newMatch });
        return phase;
      });
      await newMatch.save();
      await tournament.save();
      res.json({ success: true });
    },
  },
  {
    url: "/update/status/:matchKey",
    method: "put",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { matchKey } = req.params;
      const match = await Match.findOne({ key: matchKey });
      if (!match) throw new CustomError("BadRequestError", ["Match Not Found"]);
      switch (match.status) {
        case MatchStatus.UPCOMING:
        case MatchStatus.STOPPED:
          match.status = MatchStatus.STARTED;
          if (!match.onDate.started) match.onDate.started = new Date();
          break;
        case MatchStatus.STARTED:
          match.status = MatchStatus.STOPPED;
          match.onDate.stopped = new Date();
          break;
      }
      await match.save();
      res.json({ success: true });
    },
  },
  {
    url: "/delete/:tournamentKey/:matchKey",
    method: "delete",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { tournamentKey, matchKey } = req.params;
      const match = await Match.findOne({ key: matchKey });
      if (!match) throw new CustomError("BadRequestError", ["Match Not Found"]);
      const tournament = await Tournament.findOne({ key: tournamentKey });
      if (!tournament)
        throw new CustomError("BadRequestError", ["Tournament Not Found"]);

      tournament.phases = tournament.phases.map((phase) => {
        phase.matches = phase.matches.filter(
          (phaseMatch) => `${phaseMatch.matchDetail}` !== `${match.id}`
        );
        return phase;
      });

      await tournament.save();
      await match.delete();
      res.json({ success: true });
    },
  },
];
