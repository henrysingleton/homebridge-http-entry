import mappers, {
    StaticMapperParams,
    RegexMapperParams,
    MapperFunction,
} from './mappers';

export interface StaticMapperConfig {
    type: 'static';
    parameters: StaticMapperParams;
}

export interface RegexMapperConfig {
    type: 'regex';
    parameters: RegexMapperParams;
}

export type MapperConfig =
    | StaticMapperConfig
    | RegexMapperConfig;

export default (mapperConfigs: MapperConfig[] = []) => {
    return mapperConfigs.reduce((acc: MapperFunction[], config) => {
        switch (config.type) {
            case 'static':
                return [...acc, mappers.static(config.parameters)];
            case 'regex':
                return [...acc, mappers.regex(config.parameters)];
            default:
                return acc;
        }
    }, []);
};
