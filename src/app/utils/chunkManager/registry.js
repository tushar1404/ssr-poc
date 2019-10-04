class ChunkRegistry {
    constructor(){
      this.chunks = []
    }
    addChunk(name){
      if(this.chunks.indexOf(name) == -1 ){
          this.chunks.push(name)
      }
  }
}

export default ChunkRegistry