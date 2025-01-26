import GridLayout from "react-grid-layout";

const GridLayoutComponent = ({ widgets }: { widgets: any[] }) => {
  return (
    <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
      {widgets.map((widget, index) => (
        <div key={index} data-grid={widget.layout}>
          {widget.content}
        </div>
      ))}
    </GridLayout>
  );
};

export default GridLayoutComponent;
