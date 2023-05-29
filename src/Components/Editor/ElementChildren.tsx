import ElementChild from "./ElementChild";

const ElementChildren = ({
  children,
  isEditing,
}: {
  children: any;
  isEditing: boolean;
}) => {
  if (isEditing) {
    return <>{children}</>;
  }
  return (
    <>
      {children.map((child: any) => (
        <ElementChild key={child.key} child={child} />
      ))}
    </>
  );
};

export default ElementChildren;
