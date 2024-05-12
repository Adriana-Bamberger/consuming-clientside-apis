import request from 'superagent'
import { AmiiboCollection } from '../models/amiibo.ts'
import { DisneyCharacterResponse } from '../models/disney.ts'

// *** EXAMPLE ***
export async function getAmiiboWithName(
  name: string,
): Promise<AmiiboCollection> {
  const response = await request
    .get(`https://www.amiiboapi.com/api/amiibo/`)
    .query({ name })

  return response.body
}
// ***   ***   ***

export async function getDisneyCharacters(): Promise<DisneyCharacterResponse> {
  const response = await request.get(`https://api.disneyapi.dev/character`)
  console.log(response.body)
  return response.body
}
