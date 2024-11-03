import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { type Song } from '../types/Song';
import { DEFAULT_SONG } from '../utils/DEFAULT_SONG';
import { repeat } from 'lit/directives/repeat.js';
import './SongCard/SongCard';
import getPosition from '../utils/getPosition';

@customElement('card-list')
export class SongList extends LitElement {
    @property({
        type: Array,
    })
    songs: Song[] = [DEFAULT_SONG];

    override render() {
        return html`<div>
            ${repeat(
                this.songs,
                (song, index) =>
                    html`<song-card
                        position="${getPosition(index, this.songs.length)}"
                        song-title="${song.title}"
                        artist="${song.artist}"
                        cover="${song.cover}"
                    ></song-card>`
            )}
        </div>`;
    }
}
