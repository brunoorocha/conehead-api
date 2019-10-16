
class Measurement {
  public id: string
  public name: string
  public abbreviation: string

  constructor (id: string, name: string, abbreviation: string) {
    this.id = id
    this.name = name
    this.abbreviation = abbreviation
  }
}

export default Measurement
