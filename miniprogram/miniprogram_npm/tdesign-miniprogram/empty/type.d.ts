export interface TdEmptyProps {
    customStyle?: {
        type: StringConstructor;
        value?: string;
    };
    description?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-description', 't-class-image', 't-class-actions'];
    };
    icon?: {
        type: StringConstructor;
        value?: string;
    };
    image?: {
        type: StringConstructor;
        value?: string;
    };
}
