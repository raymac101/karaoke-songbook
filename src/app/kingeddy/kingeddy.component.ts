import { Component,Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ExcelService } from '../excel.service';
import { Song } from '../song.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-kingeddy',
  templateUrl: './kingeddy.component.html',
  styleUrls: ['./kingeddy.component.scss']
})
export class KingEddyComponent implements OnInit {

  constructor(private xlService: ExcelService, private http: HttpClient) { }
  songs: Song[] = [];
  displaySongs: Song[] = [];
  term = '';
  public isLoading = true;
  public searchword = '';
  public results = 0;
  public records = 0;

  searchThis() {
    if(this.searchword.length > 2) {
      this.displaySongs = this.songs.filter( (ele, i, array) => {
        let titleElement = ele.title.toString().toLowerCase();
        let artistElement = ele.artist.toString().toLowerCase();
        if (titleElement.includes(this.searchword.toString().toLowerCase()) ||
            artistElement.includes(this.searchword.toString().toLowerCase())) {
              return true;
        } else {
          return false;
        }
      })
      this.results = this.displaySongs.length;
    } else {
      this.getSubSet('0');
    }
  }

  ngOnInit() {
    this.loadFile('assets/kingeddydata.xlsx');
  }

  loadFile(filename: string) {
    this.http.get(filename, {responseType: 'arraybuffer' })
      .subscribe(data => {
        const reader: FileReader = new FileReader();
        reader.onload = async (e: any) => {
          this.songs = await this.parseData(e);
          this.getSubSet('0');
          this.isLoading = false;
          this.records = this.songs.length;

          // this.removeDuplicates();
        };
        reader.readAsBinaryString(new Blob([data]));
    });
  }

  parseData(e: any) {
    const bstr: string = e.target.result;
    const data = <any[]>this.xlService.importFromFile(bstr);

    // const header: string[] = Object.getOwnPropertyNames(new Song());
    const importedData = data.slice(1, -1);

    return importedData.map(arr => {
      const obj: Song = {
        id: 'id',
        title: 'title',
        artist: 'artist'
      };

      // let count = String(arr[0]).indexOf(' (');
      let idObj = String(arr[0]).substring(0, 1).toLocaleUpperCase();
      let titleObj = '';
      // if(count > 1) {
      //   titleObj = String(arr[0]).substring(0, count);
      // } else {
        titleObj = arr[0];
      // }
      let artistObj = String(arr[1]);

      obj['id'] = idObj;
      obj['title'] = titleObj;
      obj['artist'] = artistObj;

      return <Song>obj;
    })
  }

  getSubSet(index: string) {
    this.displaySongs = [];
    if(index === '0') {
      this.songs.forEach(song => {
        if(song.id.match("^.*[0-9!@#$%^&*() ].*$")) {
          this.displaySongs.push(song);
        }
      })
    } else {
      this.songs.forEach(song => {
        if(song.id === index) {
          this.displaySongs.push(song);
        }
      })
    }

    this.results = this.displaySongs.length;
  }

  removeDuplicates() {
    let newArray: Song[] = [];
    this.songs.forEach(songObj => {
      if(!newArray.find(element => element.title === songObj.title)) {
        newArray.push(songObj);
      }
    });

    this.songs = newArray;
  }
}
