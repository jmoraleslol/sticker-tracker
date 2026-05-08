// NOTE: Team list and sticker codes are based on the official Panini WC 2026 album.
// Verify against your physical album and update team codes/names if needed.

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

// 48 teams × 20 stickers = 960 + 20 FWC = 980 total
// Sticker 1 = Team Badge (FOIL), Sticker 2 = Team Photo, Stickers 3-20 = Players
export const TEAMS = [
  // CONCACAF (6 teams)
  { code: 'USA', name: 'United States',    flag: '🇺🇸', confederation: 'CONCACAF' },
  { code: 'MEX', name: 'Mexico',           flag: '🇲🇽', confederation: 'CONCACAF' },
  { code: 'CAN', name: 'Canada',           flag: '🇨🇦', confederation: 'CONCACAF' },
  { code: 'PAN', name: 'Panama',           flag: '🇵🇦', confederation: 'CONCACAF' },
  { code: 'HON', name: 'Honduras',         flag: '🇭🇳', confederation: 'CONCACAF' },
  { code: 'JAM', name: 'Jamaica',          flag: '🇯🇲', confederation: 'CONCACAF' },
  // CONMEBOL (6 teams)
  { code: 'ARG', name: 'Argentina',        flag: '🇦🇷', confederation: 'CONMEBOL' },
  { code: 'BRA', name: 'Brazil',           flag: '🇧🇷', confederation: 'CONMEBOL' },
  { code: 'COL', name: 'Colombia',         flag: '🇨🇴', confederation: 'CONMEBOL' },
  { code: 'ECU', name: 'Ecuador',          flag: '🇪🇨', confederation: 'CONMEBOL' },
  { code: 'URU', name: 'Uruguay',          flag: '🇺🇾', confederation: 'CONMEBOL' },
  { code: 'VEN', name: 'Venezuela',        flag: '🇻🇪', confederation: 'CONMEBOL' },
  // UEFA (16 teams)
  { code: 'GER', name: 'Germany',          flag: '🇩🇪', confederation: 'UEFA' },
  { code: 'FRA', name: 'France',           flag: '🇫🇷', confederation: 'UEFA' },
  { code: 'ESP', name: 'Spain',            flag: '🇪🇸', confederation: 'UEFA' },
  { code: 'ENG', name: 'England',          flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA' },
  { code: 'POR', name: 'Portugal',         flag: '🇵🇹', confederation: 'UEFA' },
  { code: 'NED', name: 'Netherlands',      flag: '🇳🇱', confederation: 'UEFA' },
  { code: 'BEL', name: 'Belgium',          flag: '🇧🇪', confederation: 'UEFA' },
  { code: 'ITA', name: 'Italy',            flag: '🇮🇹', confederation: 'UEFA' },
  { code: 'SUI', name: 'Switzerland',      flag: '🇨🇭', confederation: 'UEFA' },
  { code: 'CRO', name: 'Croatia',          flag: '🇭🇷', confederation: 'UEFA' },
  { code: 'DEN', name: 'Denmark',          flag: '🇩🇰', confederation: 'UEFA' },
  { code: 'SRB', name: 'Serbia',           flag: '🇷🇸', confederation: 'UEFA' },
  { code: 'AUT', name: 'Austria',          flag: '🇦🇹', confederation: 'UEFA' },
  { code: 'TUR', name: 'Turkey',           flag: '🇹🇷', confederation: 'UEFA' },
  { code: 'HUN', name: 'Hungary',          flag: '🇭🇺', confederation: 'UEFA' },
  { code: 'UKR', name: 'Ukraine',          flag: '🇺🇦', confederation: 'UEFA' },
  // CAF – Africa (9 teams)
  { code: 'MAR', name: 'Morocco',          flag: '🇲🇦', confederation: 'CAF' },
  { code: 'SEN', name: 'Senegal',          flag: '🇸🇳', confederation: 'CAF' },
  { code: 'NGA', name: 'Nigeria',          flag: '🇳🇬', confederation: 'CAF' },
  { code: 'EGY', name: 'Egypt',            flag: '🇪🇬', confederation: 'CAF' },
  { code: 'CIV', name: "Côte d'Ivoire",   flag: '🇨🇮', confederation: 'CAF' },
  { code: 'GHA', name: 'Ghana',            flag: '🇬🇭', confederation: 'CAF' },
  { code: 'CMR', name: 'Cameroon',         flag: '🇨🇲', confederation: 'CAF' },
  { code: 'COD', name: 'DR Congo',         flag: '🇨🇩', confederation: 'CAF' },
  { code: 'TUN', name: 'Tunisia',          flag: '🇹🇳', confederation: 'CAF' },
  // AFC – Asia (8 teams)
  { code: 'JPN', name: 'Japan',            flag: '🇯🇵', confederation: 'AFC' },
  { code: 'KOR', name: 'South Korea',      flag: '🇰🇷', confederation: 'AFC' },
  { code: 'AUS', name: 'Australia',        flag: '🇦🇺', confederation: 'AFC' },
  { code: 'KSA', name: 'Saudi Arabia',     flag: '🇸🇦', confederation: 'AFC' },
  { code: 'IRN', name: 'Iran',             flag: '🇮🇷', confederation: 'AFC' },
  { code: 'IRQ', name: 'Iraq',             flag: '🇮🇶', confederation: 'AFC' },
  { code: 'JOR', name: 'Jordan',           flag: '🇯🇴', confederation: 'AFC' },
  { code: 'UZB', name: 'Uzbekistan',       flag: '🇺🇿', confederation: 'AFC' },
  // OFC (1 team)
  { code: 'NZL', name: 'New Zealand',      flag: '🇳🇿', confederation: 'OFC' },
  // Intercontinental playoff winners (2 teams)
  { code: 'ALB', name: 'Albania',          flag: '🇦🇱', confederation: 'UEFA' },
  { code: 'BOL', name: 'Bolivia',          flag: '🇧🇴', confederation: 'CONMEBOL' },
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
    stickers: FWC_STICKERS,
  },
  ...TEAMS.map(team => ({
    id: team.code,
    name: team.name,
    type: 'team',
    flag: team.flag,
    confederation: team.confederation,
    stickers: buildTeamStickers(team),
  })),
]

export const ALL_STICKERS = SECTIONS.flatMap(s => s.stickers)

export const TOTAL = ALL_STICKERS.length // should be 980

export const CONFEDERATION_ORDER = ['INTRO', 'CONCACAF', 'CONMEBOL', 'UEFA', 'CAF', 'AFC', 'OFC']
