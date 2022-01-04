declare module 'rete-react-render-plugin' {
  import { NodeEditor } from 'rete';

  const exported: {
    name: 'react-render';
    install: (editor: NodeEditor) => void;
  };

  export = exported;
}
