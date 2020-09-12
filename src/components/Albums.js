import React from "react"
import { Col, Row }  from 'react-bootstrap'

class Albums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: '',
      albums:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getAlbums(artistName) {
    fetch(`https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=${artistName}`)
    .then(response => {
      if(response.status === 200){
        return(response.json())
      }
    })
    .then(d => {
      this.setState({ albums: d })
    })
  }

  handleChange(e) {
    this.setState({ form: e.target.value });
  }

  handleSubmit(e) {
    const { form } = this.state
    this.getAlbums(form)
    e.preventDefault()
  }

  render() {
    const { albums } = this.state
    const { album } = albums
    console.log(album)
    return (
      <React.Fragment>
        <div className="containter">
          <Col>
            <Row sm={12} id="form">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Search An Aritst:<br />
                  <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label><br/>
                <input type="submit" value="Search Discography" />
              </form>
            </Row>
            <Row id="albums">
            {album && album.map((a, i) => 
              <Col md={6} key={i} id="album">
                <img src={a.strAlbumThumb} alt="album cover" className="img-fluid" id="image"/>
                <div className="overlay">
                  <h1>{a.strAlbum}</h1>
                  <div>{a.strDescriptionEN}</div>
                </div>
              </Col>
            )}
            {(!album || album === undefined) && 
              <h1>Please enter an artist name</h1>
            }
            </Row>
          </Col>
        </div> 
      </React.Fragment>
    );
  }
}

export default Albums;
