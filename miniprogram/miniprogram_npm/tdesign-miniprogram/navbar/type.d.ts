export interface TdNavbarProps {
    animation?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    background?: {
        type: StringConstructor;
        value?: string;
    };
    customStyle?: {
        type: StringConstructor;
        value?: string;
    };
    delta?: {
        type: NumberConstructor;
        value?: number;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: [
            't-class',
            't-class-title',
            't-class-left',
            't-class-center',
            't-class-left-icon',
            't-class-home-icon',
            't-class-capsule',
            't-class-nav-btn'
        ];
    };
    fixed?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    homeIcon?: {
        type: StringConstructor;
        value?: string;
    };
    leftIcon?: {
        type: StringConstructor;
        value?: string;
    };
    title?: {
        type: StringConstructor;
        value?: string;
    };
    titleMaxLength?: {
        type: NumberConstructor;
        value?: number;
    };
    visible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
