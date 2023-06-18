import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="bg-light-purple px-5 pt-7 pb-5">
        <h1 className="text-5xl font-mono mb-5">Cohousing made simple</h1>
        <div className="w-fit">
          <Link href="/listings">
            <div className="group animate-shrink bg-dark-purple pr-14 border-2 rounded-full pointer-events-none transition-all hover:pr-0">
              <div className="peer/draft bg-background py-2 px-4 border-2 rounded-full -m-[2px] pointer-events-auto transition-all hover:pr-8">
                Find cohousing
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="px-5 font-mono py-5">
        <h2 className="font-mono text-2xl mb-2">For cohousers</h2>
        <p>
          Comatch does some very cool stuff that you would never believe. We are
          committed to doing all sorts of stuff for cohousers, it’s insane how
          much stuff we want to do tbh.
        </p>
      </div>
      <div className="bg-white flex flex-row px-5 py-5">
        <div className="pr-4 border-r-2 border-dotted">
          <Image
            src="/house.jpg"
            alt="house example"
            width={150}
            height={200}
          />
        </div>
      </div>
      <div className="px-5 font-mono py-5">
        <h2 className="font-mono text-2xl mb-2">For house owners</h2>
        <p>
          Comatch does some very cool stuff that you would never believe. We are
          committed to doing all sorts of stuff for cohousers, it’s insane how
          much stuff we want to do tbh.
        </p>
        <Link href="/post-listing">
          <div className="flex flex-row justify-center my-5">
            <div className="w-fit bg-background py-2 px-4 border-2 rounded-full -m-[2px] pointer-events-auto transition-all hover:bg-black hover:text-white">
              Post cohousing
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
