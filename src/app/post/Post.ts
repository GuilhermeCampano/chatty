import {Component, Input} from 'angular2/core'
import {ActionService} from '../services/ActionService'
import {SettingsService} from '../services/SettingsService'
import {TabService} from '../services/TabService'
import {EmbedContent} from '../embedContent/EmbedContent'

import './post.scss';
import './shacktags.scss';
import './tags.scss';

@Component({
    selector: 'post',
    template: require('./post.html'),
    directives: [EmbedContent]
})
export class Post {
    @Input() public post

    constructor(private actionService:ActionService,
                private settingsService:SettingsService,
                private tabService:TabService) {
    }

    collapse() {
        if (this.post.parentId) {
            this.actionService.collapsePostReply(this.post)
        } else {
            this.actionService.collapseThread(this.post)
        }
    }

    openReplyBox() {
        this.actionService.openReplyBox(this.post)
    }

    addUserTab(user) {
        this.tabService.addTab('user', user)
    }

    pinPost() {
        this.actionService.togglePinThread(this.post)
    }

    isLoggedIn() {
        return this.settingsService.isLoggedIn()
    }

    getTagWidth(count) {
        return Math.min(15 + count * 5, 45)
    }
}
