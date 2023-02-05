export type MapperFunction = (value: string) => string | null;

export interface StaticMapperParams {
    mapping: {
        [key: string]: string;
    };
}

export interface RegexMapperParams {
    expression: string;
    captureGroup?: number;
}

export const staticMapper = ({
    mapping,
}: StaticMapperParams): MapperFunction => (value) => {
    return mapping[value] || value;
};

export const regexMapper = ({
    expression,
    captureGroup = 1,
}: RegexMapperParams): MapperFunction => (value) => {
    const re = new RegExp(expression);
    const matches = re.exec(value);

    if (matches && captureGroup in matches) {
        return matches[captureGroup];
    }

    return '';
};

export default {
    static: staticMapper,
    regex: regexMapper,
};
