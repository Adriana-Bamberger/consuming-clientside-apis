interface DisneyCharacter {
  _id: number
  films: string[]
  shortFilms: string[]
  tvShows: string[]
  videoGames: string[]
  parkAttractions: string[]
  allies: string[]
  enemies: string[]
  sourceUrl: string
  name: string
  imageUrl: string
  createdAt: string // Date string in ISO 8601 format (e.g., "2021-04-12T01:31:30.547Z")
  updatedAt: string // Date string in ISO 8601 format (e.g., "2021-12-20T20:39:18.033Z")
  url: string
  __v: number // This property might not be relevant in your application logic
}

interface DisneyCharacterInfo {
  count: number
  totalPages: number
  previousPage: string | null
  nextPage: string
}
export interface DisneyCharacterResponse {
  info: DisneyCharacterInfo
  data: DisneyCharacter[]
}
