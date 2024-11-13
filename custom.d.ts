declare namespace JSX {
    interface IntrinsicElements {
        'bsky-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            'data-handle'?: string;
            'data-show-description'?: boolean;
            'data-show-banner'?: boolean;
        };
    }
}