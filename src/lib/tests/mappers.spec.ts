import mappers from '../mappers';

describe('staticMapper', () => {
    it('maps a static value to another', () => {
        const params = {
            mapping: {
                this: 'that',
            },
        };
        const mapper = mappers.static(params);
        expect(mapper('this')).toEqual('that');
    });
});

describe('regexMapper', () => {
    it('maps a regex value to another', () => {
        const params = {
            expression: '^The door is currently (OPEN|CLOSED), yo!$',
            captureGroup: 1,
        };
        const mapper = mappers.regex(params);
        expect(mapper('The door is currently OPEN, yo!')).toEqual('OPEN');
    });
});
