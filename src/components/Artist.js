import React, { useState, useEffect } from "react"
import { Col, Row, Container }  from 'react-bootstrap'

const Artist = () => {
  const [form, setForm] = useState('');
  const [query, setQuery] = useState('')
  const [artist, setArtist] = useState('')
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setQuery(form)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${query}`)
        const json = await response.json();
        setArtist(json.artists[0])
        setError(false)
        setForm('')
      } catch (error) {
        setError(true)
        setForm('')
      }
    }
    if (query !== '') {
      fetchData()
    }
  }, [query])

  const { 
    strArtist,
    strBiographyEN,
    strArtistThumb
  } = artist

  const name = strArtist
  const bio = strBiographyEN
  const pic = strArtistThumb

  return (
    <React.Fragment>
      <Container>
        <Col>
          <Row sm={ 12 } id="form">
            <Col sm={12} >
              <form onSubmit={ handleSubmit }>
                <label>
                  Search An Aritst:<br />
                  <input 
                    type="text" 
                    value={ form } 
                    onChange={ handleChange } 
                  />
                </label><br/>
                <input type="submit" value="Search" />
              </form> 
            </Col>
          </Row>

          <Row sm={12} className="info">
            { (artist && !error) &&
              <>
                <Col sm={6} className="img">
                  <img src={ pic } alt="artist logo" className="img-fluid" />
                </Col>
                <Col sm={6}>
                  <div className="bio">
                    <h1> { name }</h1>
                    <p >{ bio }</p>
                  </div>
                </Col>
              </>
            }
            {(!artist && error === null) &&
              <Col>
                <h1>No Artist Has Been Searched Yet</h1>
              </Col>
            }
            {((error && !artist)||(error && artist)) &&
              <Col>
                <h1>Invalid Entry</h1>
              </Col>
            }
          </Row>
        </Col>
      </Container> 
    </React.Fragment>
  );
}

export default Artist;
