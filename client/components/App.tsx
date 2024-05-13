import { useState, useEffect } from 'react'
import { Header } from './Header.tsx'
import { getDisneyCharacters } from '../apiClient.ts'
import {
  DisneyCharacterResponse,
  DisneyCharacter,
} from '../../models/disney.ts'
import Collapsible from './Collapsible.tsx'

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

  const charactersWithDetails: DisneyCharacter[] = displayCharacters.data.map(
    (character) => ({
      ...character, // Copy all properties from the original character
      isOpen: false, // Set initial isOpen state to false for all characters
    }),
  )

  return (
    <>
      <Header />
      {charactersWithDetails.map((character) => (
        <Collapsible
          key={character.name}
          title={character.name}
          isOpen={character.isOpen}
        >
          <h3>Films: {character.films.join(', ')}</h3>
          <p>
            Video Games: {character.videoGames} -{' '}
            <a href={character.sourceUrl} target="_blank" rel="noreferrer">
              Go to Disney.Fandom.com
            </a>
          </p>
          <p>{character.tvShows}</p>
          <p>{character.createdAt}</p>
          <img src={character.imageUrl} alt={character.name} />
        </Collapsible>
      ))}
    </>
  )
}

export default App
//   return (
//     <>
//       <Header />
//       <Collapsible open title={'Title here'}>
//         {' '}
//         werfjgieshgfr;oiesf;sogijse;ofgjeosgj
//       </Collapsible>
//       <ul>
//         {displayCharacters.data.map((value, index) => (
//           <li key={index}>
//             <h3>
//               {value.name} - {value.films}
//             </h3>
//             <p>
//               {value.videoGames} - {value.sourceUrl}{' '}
//             </p>
//             <img src={value.imageUrl} alt={value.name} />
//           </li>
//         ))}
//       </ul>
//     </>
//   )
// }

// export default App
