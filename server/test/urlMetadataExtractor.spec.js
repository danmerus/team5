/* eslint-env mocha */

const assert = require('assert');

const extractor = require('../libs/urlMetadataExtractor');

const yandexExpected = {
    description: 'Найдётся всё',
    title: 'Яндекс',
    url: 'https://yandex.ru'
};

const e1Expected = {
    url: 'https://www.e1.ru',
    description: 'Городской портал Екатеринбурга: новости, форумы, доска объявлений,' +
    ' справочная информация',
    title: 'Екатеринбург Онлайн'
};

const googleExpected = {
    url: 'https://google.com/',
    description: 'Поиск информации в интернете: веб страницы, картинки, видео и многое другое.',
    title: 'Google'
};

describe('extract by url', function () {

    it('correct url', async function () {
        const actual = await extractor.extract(yandexExpected.url);
        assertMetadataEquality(actual, yandexExpected);
    }).timeout(4000);

    it('incorrect url', async function () {
        const actual = await extractor.extract('bbbb.aaaa');
        assert.equal(actual, null);
    }).timeout(3000);
});

describe('extract from the text', function () {
    it('simple url', async function () {
        const actual = await extractor.extractFromText(yandexExpected.url);
        assertMetadataEquality(actual, yandexExpected);
    });

    it('text without links', async function () {
        const textWithoutLinks = 'Stack Overflow - Where Developers Learn, Share, & Build Careers';
        const actual = await extractor.extractFromText(textWithoutLinks);
        assert.equal(actual, null);
    });

    it('text with multiple links', async function () {
        const multipleLinks = `yandex: ${yandexExpected.url} github: https://github.com`;
        const actual = await extractor.extractFromText(multipleLinks);
        assertMetadataEquality(actual, yandexExpected);
    }).timeout(3000);

    it('https://www.e1.ru', async function () {
        const actual = await extractor.extractFromText(e1Expected.url);
        assertMetadataEquality(actual, e1Expected);
    }).timeout(3000);

    it('http://google.com/', async function () {
        const actual = await extractor.extractFromText(googleExpected.url);
        assertMetadataEquality(actual, googleExpected);
    }).timeout(3000);

    it('null if metadata is not found', async function () {
        const actual = await extractor.extractFromText('https://github.com/ed076287');
        assert.equal(actual, null);
    }).timeout(3000);


    it('link with brackets', async function () {
        const actual = await extractor.extractFromText(
            'https://en.wikipedia.org/wiki/Affect_(psychology)');
        assert.notEqual(actual, null);
    }).timeout(3000);

});

describe('link and punctuation', function () {
    it('link in brackets', async function () {
        const actual = await extractor.extractFromText(`[нажми меня!](${googleExpected.url}).`);
        assertMetadataEquality(actual, googleExpected);
    }).timeout(3000);

    it('comma after link', async function () {
        const actual = await extractor.extractFromText(`${e1Expected.url},`);
        assertMetadataEquality(actual, e1Expected);
    }).timeout(3000);
});

function assertMetadataEquality(actual, expected) {
    assert.equal(actual.description, expected.description);
    assert.equal(actual.title, expected.title);
}
