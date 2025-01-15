declare module 'vaul' {
  import React from 'react';

  export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    dismissible?: boolean;
    snapPoints?: number[];
    activeSnapPoint?: number;
    modal?: boolean;
    shouldScaleBackground?: boolean;
  }

  export interface DrawerTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}
  export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {}
  export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
  export interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
  export interface DrawerDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
  export interface DrawerCloseProps extends React.HTMLAttributes<HTMLButtonElement> {}

  export const Drawer: React.FC<DrawerProps> & {
    Root: React.FC<DrawerProps>;
    Trigger: React.FC<DrawerTriggerProps>;
    Portal: React.FC<React.HTMLAttributes<HTMLDivElement>>;
    Overlay: React.FC<React.HTMLAttributes<HTMLDivElement>>;
    Content: React.FC<DrawerContentProps>;
    Header: React.FC<DrawerHeaderProps>;
    Title: React.FC<DrawerTitleProps>;
    Description: React.FC<DrawerDescriptionProps>;
    Close: React.FC<DrawerCloseProps>;
  };

  export const DrawerTrigger: React.FC<DrawerTriggerProps>;
  export const DrawerPortal: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const DrawerOverlay: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const DrawerContent: React.FC<DrawerContentProps>;
  export const DrawerHeader: React.FC<DrawerHeaderProps>;
  export const DrawerTitle: React.FC<DrawerTitleProps>;
  export const DrawerDescription: React.FC<DrawerDescriptionProps>;
  export const DrawerClose: React.FC<DrawerCloseProps>;
}

declare module 'react-resizable-panels' {
  import React from 'react';

  export interface PanelProps {
    children?: React.ReactNode;
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    collapsible?: boolean;
    order?: number;
    className?: string;
  }

  export interface PanelGroupProps {
    children?: React.ReactNode;
    direction?: 'horizontal' | 'vertical';
    autoSaveId?: string;
    className?: string;
  }

  export interface PanelResizeHandleProps {
    className?: string;
    children?: React.ReactNode;
  }

  export const Panel: React.FC<PanelProps>;
  export const PanelGroup: React.FC<PanelGroupProps>;
  export const PanelResizeHandle: React.FC<PanelResizeHandleProps>;
}