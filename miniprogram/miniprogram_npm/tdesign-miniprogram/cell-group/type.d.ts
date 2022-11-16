export interface TdCellGroupProps {
    bordered?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    customStyle?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class'];
    };
    title?: {
        type: StringConstructor;
        value?: string;
    };
}
