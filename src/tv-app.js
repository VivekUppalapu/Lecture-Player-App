// import stuff
import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@lrnwebcomponents/video-player/video-player.js';
import "./tv-channel.js";

const data = "../assets/channels.json"
export class TvApp extends LitElement {
  // defaults
  constructor() {
    super();
    this.name = '';
    this.source = new URL('../assets/channels.json', import.meta.url).href;
    this.listings = [];
  }
  // convention I enjoy using to define the tag's name
  static get tag() {
    return 'tv-app';
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      name: { type: String },
      source: { type: String },
      listings: { type: Array },
    };
  }
  // LitElement convention for applying styles JUST to our element
  static get styles() {
    return [
      css`
      :host {
        display: block;
        margin: 16px;
        padding: 16px;
      }
      .grid-container 
      {
        display: grid;
        grid-template-columns: auto auto;
        background-color: white;
        padding: 10px;
        gap: 10px;
      }
      .grid-item1
      {
          height: 357px;
          width: 700px;
          
      }
      .grid-item2
        {
          height: 900px;
          width: 400px;
          border: 1px solid rgba(0, 0, 0, 0.8);
          background-color: grey;
        }
        .scroll-container 
        {
          width: 350px;
          height: 850px;
          overflow-y: auto;
          padding-top: 5px;
          padding-left: 25px;
        }
        .grid-item3
        {
          width: 700px;
          height: 350px;
          background-color: black;
        }
      `
    ];
  }
  // LitElement rendering template of your element
  render() {
    return html `
      <div class="grid-container">
        <div class="grid-item1">
          <video-player source="https://www.youtube.com/watch?v=zLAYGZeVTPQ&t=30s"></video-player>
          <div class="grid-item3">
      </div>
        </div>
        <div class="grid-item2">
        <div class="scroll-container">
        ${
          this.listings.map(
            (timecode) => html`
               <iframe width="350" height="200" src="https://www.youtube.com/embed/zLAYGZeVTPQ?start=${timecode}" allowfullscreen></iframe>
            `
          )
        }
        </div>
        </div>
      </div>
      
    `;
    }
     
  // LitElement life cycle for when any property changes
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "source" && this[propName]) {
        this.updateSourceData(this[propName]);
      }
    });
  }

  async updateSourceData(data) {
    await fetch(data)
      .then((resp) => resp.ok ? resp.json() : [])
      .then((responseData) => {
        if (responseData.status === 200 && responseData.data.items && responseData.data.items.length > 0) 
        {
          this.listings= responseData.data.items.map(item => item.metadata.timecode);
         
          this.updateVideoTime();
        }
      });
  }
  
  updateVideoTime() {
    
  }
}
// tell the browser about our tag and class it should run when it sees it
customElements.define(TvApp.tag, TvApp);
