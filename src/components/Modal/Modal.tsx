interface ModalProps {
  mission: string;
  rocket: string;
  patch: string;
  details: string;
}

export const Modal = ({ mission, rocket, patch, details }: ModalProps) => {
  return (
    <div>
      <h3>{mission}</h3>
    </div>
  );
};
