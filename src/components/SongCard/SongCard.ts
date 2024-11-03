import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../CopyButton';
import styles from './SongCard.css?raw';
import { getFullTitle } from '../../utils/getFullTitle';
import type { Position } from '../../types/Position';

@customElement('song-card')
export class SongCard extends LitElement {
    @property({ type: String, attribute: 'song-title' })
    title = 'No title';

    @property({ type: String })
    artist = 'No artist';

    @property({ type: String })
    cover: string = '';

    @property({ type: String })
    position: Position = '';

    static styles = unsafeCSS(styles);

    override render() {
        const copyString = getFullTitle(this.title, this.artist);
        return html`<article class="card" role="region" aria-live="polite" data-position="${this.position}">
            <div class="image">
                <img src="${this.cover}" data-song-cover alt="" />
            </div>
            <div class="info-container">
                <div class="info">
                    <p class="title">
                        <span data-song-title>${this.title}</span>
                    </p>
                    <p class="artist">
                        <span data-song-artist>${this.artist}</span>
                    </p>
                </div>
                <copy-button text="${copyString}" />
            </div>
        </article>`;
    }
}
