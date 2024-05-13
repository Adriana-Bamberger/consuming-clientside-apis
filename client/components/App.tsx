import { useState, useEffect } from 'react'

import { getDisneyCharacters } from '../apiClient.ts'
import { DisneyCharacterResponse } from '../../models/disney.ts'
import { DisneyCharacter } from '../../models/disney.ts'

function App() {
  // const [collection, setCollection] = useState<AmiiboCollection | null>(null)
  const [displayCharacters, setDisplayCharacters] =
    useState<DisneyCharacterResponse | null>(null)

  const [error, setError] = useState<string | null>(null)

  // useEffect cannot return a promise, so we often define
  // an async function _inside_ the useEffect call
  useEffect(() => {
    async function update() {
      const data = await getDisneyCharacters()
      console.log(data.data[0].name)
      try {
        setDisplayCharacters(data)
      } catch (err) {
        setError(String(err))
      }
    }

    update()
    // we list zero dependencies here, (i.e. an empty array) so that our
    // function is called when the component mounts first and we give no reasons why the function
    // needs to be run again
  }, [])

  if (error) {
    return <p>Something went wrong: {error}</p>
  }

  if (!displayCharacters) {
    return <>Loading your Disney Characters...</>
  }

  return (
    <ul>
      {displayCharacters.data.map((value, index) => (
        <li key={index}>
          <h3>
            {value.name} - {value.films}
          </h3>
          <p>
            {value.videoGames} - {value.sourceUrl}{' '}
          </p>
          <img src={value.imageUrl} alt={value.name} />
        </li>
      ))}
    </ul>
  )
}

export default App
