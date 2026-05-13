// Team list and order sourced from the official Panini FIFA World Cup 2026 sticker album.
// Teams are ordered exactly as they appear in the album: Group A through Group L.

const FWC_STICKERS = [
  { code: 'FWC1',  name: 'Official Emblem',       foil: true  },
  { code: 'FWC2',  name: 'Official Mascots',       foil: true  },
  { code: 'FWC3',  name: 'Official Slogan',        foil: true  },
  { code: 'FWC4',  name: 'Official Ball',          foil: true  },
  { code: 'FWC5',  name: 'World Cup Trophy',       foil: false },
  { code: 'FWC6',  name: 'Canada – Host Country',  foil: true  },
  { code: 'FWC7',  name: 'Mexico – Host Country',  foil: true  },
  { code: 'FWC8',  name: 'USA – Host Country',     foil: true  },
  { code: 'FWC9',  name: 'Italy 1934',             foil: false },
  { code: 'FWC10', name: 'Uruguay 1950',           foil: false },
  { code: 'FWC11', name: 'West Germany 1954',      foil: false },
  { code: 'FWC12', name: 'Brazil 1958',            foil: false },
  { code: 'FWC13', name: 'Brazil 1962',            foil: false },
  { code: 'FWC14', name: 'West Germany 1974',      foil: false },
  { code: 'FWC15', name: 'Argentina 1986',         foil: false },
  { code: 'FWC16', name: 'Brazil 1994',            foil: false },
  { code: 'FWC17', name: 'Brazil 2002',            foil: false },
  { code: 'FWC18', name: 'Italy 2006',             foil: false },
  { code: 'FWC19', name: 'Germany 2014',           foil: false },
  { code: 'FWC20', name: 'Argentina 2022',         foil: false },
]

// Teams in exact album order (Group A → Group L), 20 stickers per team.
// Sticker 1 = Team Badge (FOIL), Sticker 2 = Team Photo, Stickers 3-20 = Players.
export const TEAMS = [
  // ── Group A ──────────────────────────────────────
  { code: 'MEX', name: 'Mexico',                 flag: '🇲🇽', confederation: 'CONCACAF', group: 'A' },
  { code: 'KOR', name: 'South Korea',            flag: '🇰🇷', confederation: 'AFC',      group: 'A' },
  { code: 'RSA', name: 'South Africa',           flag: '🇿🇦', confederation: 'CAF',      group: 'A' },
  { code: 'CZE', name: 'Czechia',                flag: '🇨🇿', confederation: 'UEFA',     group: 'A' },
  // ── Group B ──────────────────────────────────────
  { code: 'CAN', name: 'Canada',                 flag: '🇨🇦', confederation: 'CONCACAF', group: 'B' },
  { code: 'SUI', name: 'Switzerland',            flag: '🇨🇭', confederation: 'UEFA',     group: 'B' },
  { code: 'QAT', name: 'Qatar',                  flag: '🇶🇦', confederation: 'AFC',      group: 'B' },
  { code: 'BIH', name: 'Bosnia and Herzegovina', flag: '🇧🇦', confederation: 'UEFA',     group: 'B' },
  // ── Group C ──────────────────────────────────────
  { code: 'BRA', name: 'Brazil',                 flag: '🇧🇷', confederation: 'CONMEBOL', group: 'C' },
  { code: 'MAR', name: 'Morocco',                flag: '🇲🇦', confederation: 'CAF',      group: 'C' },
  { code: 'HAI', name: 'Haiti',                  flag: '🇭🇹', confederation: 'CONCACAF', group: 'C' },
  { code: 'SCO', name: 'Scotland',               flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', confederation: 'UEFA',     group: 'C' },
  // ── Group D ──────────────────────────────────────
  { code: 'USA', name: 'United States',          flag: '🇺🇸', confederation: 'CONCACAF', group: 'D' },
  { code: 'PAR', name: 'Paraguay',               flag: '🇵🇾', confederation: 'CONMEBOL', group: 'D' },
  { code: 'AUS', name: 'Australia',              flag: '🇦🇺', confederation: 'AFC',      group: 'D' },
  { code: 'TUR', name: 'Türkiye',                flag: '🇹🇷', confederation: 'UEFA',     group: 'D' },
  // ── Group E ──────────────────────────────────────
  { code: 'GER', name: 'Germany',                flag: '🇩🇪', confederation: 'UEFA',     group: 'E' },
  { code: 'CUW', name: 'Curaçao',               flag: '🇨🇼', confederation: 'CONCACAF', group: 'E' },
  { code: 'CIV', name: "Côte d'Ivoire",         flag: '🇨🇮', confederation: 'CAF',      group: 'E' },
  { code: 'ECU', name: 'Ecuador',                flag: '🇪🇨', confederation: 'CONMEBOL', group: 'E' },
  // ── Group F ──────────────────────────────────────
  { code: 'NED', name: 'Netherlands',            flag: '🇳🇱', confederation: 'UEFA',     group: 'F' },
  { code: 'JPN', name: 'Japan',                  flag: '🇯🇵', confederation: 'AFC',      group: 'F' },
  { code: 'TUN', name: 'Tunisia',                flag: '🇹🇳', confederation: 'CAF',      group: 'F' },
  { code: 'SWE', name: 'Sweden',                 flag: '🇸🇪', confederation: 'UEFA',     group: 'F' },
  // ── Group G ──────────────────────────────────────
  { code: 'BEL', name: 'Belgium',                flag: '🇧🇪', confederation: 'UEFA',     group: 'G' },
  { code: 'EGY', name: 'Egypt',                  flag: '🇪🇬', confederation: 'CAF',      group: 'G' },
  { code: 'IRN', name: 'Iran',                   flag: '🇮🇷', confederation: 'AFC',      group: 'G' },
  { code: 'NZL', name: 'New Zealand',            flag: '🇳🇿', confederation: 'OFC',      group: 'G' },
  // ── Group H ──────────────────────────────────────
  { code: 'ESP', name: 'Spain',                  flag: '🇪🇸', confederation: 'UEFA',     group: 'H' },
  { code: 'CPV', name: 'Cape Verde',             flag: '🇨🇻', confederation: 'CAF',      group: 'H' },
  { code: 'KSA', name: 'Saudi Arabia',           flag: '🇸🇦', confederation: 'AFC',      group: 'H' },
  { code: 'URU', name: 'Uruguay',                flag: '🇺🇾', confederation: 'CONMEBOL', group: 'H' },
  // ── Group I ──────────────────────────────────────
  { code: 'FRA', name: 'France',                 flag: '🇫🇷', confederation: 'UEFA',     group: 'I' },
  { code: 'SEN', name: 'Senegal',                flag: '🇸🇳', confederation: 'CAF',      group: 'I' },
  { code: 'IRQ', name: 'Iraq',                   flag: '🇮🇶', confederation: 'AFC',      group: 'I' },
  { code: 'NOR', name: 'Norway',                 flag: '🇳🇴', confederation: 'UEFA',     group: 'I' },
  // ── Group J ──────────────────────────────────────
  { code: 'ARG', name: 'Argentina',              flag: '🇦🇷', confederation: 'CONMEBOL', group: 'J' },
  { code: 'ALG', name: 'Algeria',                flag: '🇩🇿', confederation: 'CAF',      group: 'J' },
  { code: 'AUT', name: 'Austria',                flag: '🇦🇹', confederation: 'UEFA',     group: 'J' },
  { code: 'JOR', name: 'Jordan',                 flag: '🇯🇴', confederation: 'AFC',      group: 'J' },
  // ── Group K ──────────────────────────────────────
  { code: 'POR', name: 'Portugal',               flag: '🇵🇹', confederation: 'UEFA',     group: 'K' },
  { code: 'COD', name: 'DR Congo',               flag: '🇨🇩', confederation: 'CAF',      group: 'K' },
  { code: 'UZB', name: 'Uzbekistan',             flag: '🇺🇿', confederation: 'AFC',      group: 'K' },
  { code: 'COL', name: 'Colombia',               flag: '🇨🇴', confederation: 'CONMEBOL', group: 'K' },
  // ── Group L ──────────────────────────────────────
  { code: 'ENG', name: 'England',                flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA',     group: 'L' },
  { code: 'CRO', name: 'Croatia',                flag: '🇭🇷', confederation: 'UEFA',     group: 'L' },
  { code: 'GHA', name: 'Ghana',                  flag: '🇬🇭', confederation: 'CAF',      group: 'L' },
  { code: 'PAN', name: 'Panama',                 flag: '🇵🇦', confederation: 'CONCACAF', group: 'L' },
]

function buildTeamStickers(team) {
  const stickers = []
  for (let i = 1; i <= 20; i++) {
    let name, foil
    if (i === 1) { name = 'Team Badge'; foil = true }
    else if (i === 2) { name = 'Team Photo'; foil = false }
    else { name = `Player ${i - 2}`; foil = false }
    stickers.push({ code: `${team.code}${i}`, name, foil, teamCode: team.code })
  }
  return stickers
}

export const SECTIONS = [
  {
    id: 'FWC',
    name: 'FIFA World Cup 2026',
    type: 'intro',
    flag: '🌍',
    confederation: 'INTRO',
    group: null,
    stickers: FWC_STICKERS,
  },
  ...TEAMS.map(team => ({
    id: team.code,
    name: team.name,
    type: 'team',
    flag: team.flag,
    confederation: team.confederation,
    group: team.group,
    stickers: buildTeamStickers(team),
  })),
]

export const ALL_STICKERS = SECTIONS.flatMap(s => s.stickers)
export const TOTAL = ALL_STICKERS.length  // 980

export const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L']
