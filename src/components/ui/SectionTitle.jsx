export default function SectionTitle({

  subtitle,

  title,

  description,

}) {

  return (

    <div className="text-center max-w-3xl mx-auto">

      <span className="text-green-600 font-semibold uppercase tracking-widest">

        {subtitle}

      </span>

      <h2 className="text-5xl font-bold text-blue-900 mt-4">

        {title}

      </h2>

      <p className="text-gray-600 mt-6 leading-8">

        {description}

      </p>

    </div>

  );

}