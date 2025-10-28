import { Trash2 } from "lucide-react";

interface FilterFieldProps {
  id: string;
  value?: string;
  placeholder?: string;
  fieldType?: "text" | "select" | "number";
  onChange: (value: string) => void;
  onClear: () => void;
}

export function FilterField({ id, value = "", placeholder, fieldType = "text", onChange, onClear }: FilterFieldProps) {
  if (["select"].includes(fieldType)) {
    return (
      <select
        id={id}
        className="bg-white border p-2 rounded mr-2 text-xs w-full"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        <option value="">Escolha uma opção</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    );
  }

  if (["number"].includes(fieldType)) {
    return (
      <div className="relative">
        <input
          type="text"
          id={id}
          inputMode="numeric"
          pattern="\\d*"
          placeholder={placeholder}
          className="border p-2 rounded mr-2 text-xs w-full bg-white"
          value={value}
          onChange={(e) => {
            const onlyDigits = e.target.value.replace(/\D+/g, "").slice(0, 4);
            onChange(onlyDigits);
          }}
        />
        {value && value.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="absolute cursor-pointer right-1 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-800"
            title="Limpar"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="bg-white border p-2 rounded mr-2 text-xs w-full pr-8"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      {value && value.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="absolute cursor-pointer right-1 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-800"
          title="Limpar"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
