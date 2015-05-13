'use strict';

import AClass from './src/aclass';
let aClass = new AClass();
aClass.test();

var MyAvatarPrototype = Object.create(HTMLElement.prototype);
MyAvatarPrototype.createdCallback = function () {
    var shadow = this.createShadowRoot();

    var username = this.getAttribute('username');
    var service = this.getAttribute('service');
    var url = 'http://avatars.io/' + service + '/' + username;

    var img = document.createElement('img');
    img.setAttribute('src', url);

    var template = null;
    var links = document.querySelectorAll('link[rel=import]');
    for (var i = links.length - 1; i >= 0; i -= 1) {
        template = links[i].import.querySelector('#avatarTemplate2');
        if (template !== null) {
            break;
        }
    }
    var templateInstance = document.importNode(template.content, true);

    shadow.appendChild(templateInstance);
};
MyAvatarPrototype.yes = function () {
    alert('yes');
}
document.registerElement('my-avatar2', {
    prototype: MyAvatarPrototype
});