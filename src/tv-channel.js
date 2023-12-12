// import stuff
import { LitElement, html, css } from 'lit';

export class TvChannel extends LitElement {
  // defaults
  constructor() {
    super();
    this.title = '';
    this.presenter = '';
  }
  // convention I enjoy using to define the tag's name
  static get tag() {
    return 'tv-channel';
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      title: { type: String },
      description:{type: String},
      timecode:{type: String},
     active:{type: Boolean, reflect: true},
     index:{type: Number}
    };
  }
  // LitElement convention for applying styles JUST to our element
  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }
      :host([active])
      {
        background-color: red;
      }
      .wrapper {
        width: 250px;
        height: 100px;
        background-color: black;
        color: white;
        font-size: 16px;
        text-align: center;
        margin-bottom: 5px;
        font-family: 'Open Sans', sans-serif;
        align-items: center;
      }
    `;
  }
  // LitElement rendering template of your element
  render() {
    {
      return html`
      <div class="wrapper">
        <h3>${this.title}</h3>
        <h4>${this.timecode}</h4>
      </div>  
      `;
    }
    
  }
}
// tell the browser about our tag and class it should run when it sees it
customElements.define(TvChannel.tag, TvChannel);
