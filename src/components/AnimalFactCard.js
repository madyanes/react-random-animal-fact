import React from 'react';
import { getRandomAnimalFact } from '../utils/api';
import Row from './_base/Row';

/**
 * @todo
 * Selesaikan komponen AnimalFactCard hingga:
 *   1. Menampilkan fakta tentang hewan dari RESTful API
 *      menggunakan fungsi getRandomAnimalFact
 *      berdasarkan props animal.
 *
 *  2. Mengubah UI yang menampikan fact menjadi input dan
 *     menyinkronisasi document.title dengan nilai state fact.
 */

function AnimalFactCard({ animal }) {
  const [image, setImage] = React.useState(null);
  const [fact, setFact] = React.useState(null);

  // React.useEffect(() => {  // useEffect harus berjalan secara sinkronus untuk menghindari race conditions. Jangan pernah gunakan keyword async.
  //   getRandomAnimalFact(animal).then(({ fact, image }) => {
  //     setFact(fact)
  //     setImage(image)
  //   })

  //   return () => {
  //     setFact(null)  // memanfaatkan fungsi cleanup untuk re-set state ke null supaya indikasi loading muncul
  //     setImage(null)
  //   }
  // }, [animal])

  React.useEffect(() => {
    async function fetchAnimalData() {
      const { fact, image } = await getRandomAnimalFact(animal)
      setFact(fact)
      setImage(image)
    }

    fetchAnimalData()

    return () => {
      setFact(null)
      setImage(null)
    }
  }, [animal])

  return (
    <section>
      <Row label="Image">
        {image === null ? (
          <img src="https://via.placeholder.com/600x400" alt="placeholder" />
        ) : (
          <img src={image} alt={fact} />
        )}
      </Row>
      <Row label="Fact">{fact === null ? <p>Loading fact ...</p> : <p>{fact}</p>}</Row>
    </section>
  );
}

export default AnimalFactCard;
