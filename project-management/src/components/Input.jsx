export default function Input({
  label,
  name,
  type = "text",
  isTextarea = false,
  ...rest
}) {
  const inputClasses =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold text-stone-500" htmlFor={name}>
        {label}
      </label>
      {isTextarea ? (
        <textarea
          className={inputClasses}
          id={name}
          name={name}
          {...rest}
        ></textarea>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className={inputClasses}
          {...rest}
        />
      )}
    </p>
  );
}
