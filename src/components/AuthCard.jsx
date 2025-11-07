const AuthCard = ({ title, subtitle, footer, children }) => {
  return (
    <div className="flex flex-col min-h-screen md:w-1/2 w-full justify-center items-center gap-8 p-6">
      <div className="text-5xl font-extrabold tracking-wider ">
  Todo_Flow
</div>

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-neutral-950 p-10 ">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-white tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-neutral-400">{subtitle}</p>
        </div>
        <div className="space-y-6">{children}</div>
        <div className="mt-10 text-center text-sm text-neutral-500">{footer}</div>
      </div>
    </div>
  );
};

export default AuthCard;

