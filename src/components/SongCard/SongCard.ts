import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../CopyButton';
import styles from './SongCard.css?raw';
import { getFullTitle } from '../../utils/getFullTitle';

@customElement('song-card')
export class SongCard extends LitElement {
    @property({ type: String, attribute: 'title' })
    title = 'No title';

    @property({ type: String, attribute: 'artist' })
    artist = 'No artist';

    @property({ type: String, attribute: 'cover' })
    cover: string = '';

    static styles = unsafeCSS(styles);

    override render() {
        const copyString = getFullTitle(this.title, this.artist);
        return html`<article class="card" role="region" aria-live="polite">
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
