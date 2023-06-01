import {
  ProfilePreview,
  ProfilePreviewDescription,
  ProfilePreviewImage,
} from "@/components/profile-preview";
import { PulseTitle } from "@/components/pulse-title";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <section className="container max-w-3xl w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center">
        <PulseTitle>Pi Kappa Kappa</PulseTitle>

        <p className="font-display text-xl text-center">
          {'"'}A posse ad esse{'"'}
        </p>
      </section>

      <div className="min-h-screen px-5 w-full flex flex-col gap-y-28 justify-center items-center py-20">
        {/* Gard */}
        <ProfilePreview>
          {/* <ProfilePreviewImage
            description="Gard - CFO"
            src="/images/oscar.jpg"
            alt="Profilbilde av Gard"
          /> */}
          <ProfilePreviewDescription>
            <h1 className="font-display text-3xl font-medium mb-3">
              Gard Eide
            </h1>
            <p>
              Gard er CFO (Chief Financial Officer) for Pi Kappa Kappa, et
              veletablert selskap kjent for sin forretningsdrift. Med en sterk
              økonomisk bakgrunn og en karriere rik på variert erfaring, er Gard
              en nøkkelfigur i å drive virksomhetens økonomiske strategi.
            </p>
            <p>
              Før han kom til Pi Kappa Kappa, hadde Gard posisjoner innen både
              revisjon og økonomisk analyse, noe som ga ham en dyp forståelse
              for økonomisk styring. Han er kjent for sin skarpe analytiske
              tenkning og evne til å skape robuste økonomiske rammer som støtter
              selskapets vekst og stabilitet.
            </p>
          </ProfilePreviewDescription>
        </ProfilePreview>
        {/* Isak */}
        <ProfilePreview className="ml-auto">
          {/* <ProfilePreviewImage
            description="Isak - COO"
            src="/images/oscar.jpg"
            alt="Profilbilde av Isak"
          /> */}
          <ProfilePreviewDescription>
            <h1 className="font-display text-3xl font-medium mb-3">
              Isak Dammen
            </h1>
            <p>
              Isak Dammen er Chief Operating Officer (COO) i selskapet, og han
              er kjent for sin utrettelige drivkraft, operasjonelle dyktighet og
              strategiske tankegang. Med omfattende erfaring innen ledelse og
              operasjoner, har Isak spilt en kritisk rolle i å styre selskapets
              operasjonelle aktiviteter og bidratt til dets suksess.
            </p>
            <p>
              Før han kom til selskapet, jobbet Isak i forskjellige ledende
              stillinger i flere vellykkede selskaper, hvor han fikk verdifull
              erfaring med å administrere operasjonelle prosesser og lede
              tverrfaglige team. Hans ledelsesstil kombinerer strategisk visjon
              med operasjonell finesse, noe som har resultert i forbedret
              effektivitet og produktivitet innen organisasjonen.
            </p>
          </ProfilePreviewDescription>
        </ProfilePreview>
        {/* Ole Magnus */}
        <ProfilePreview>
          {/* <ProfilePreviewImage
            description="Ole Magnus - CTO"
            src="/images/oscar.jpg"
            alt="Profilbilde av Ole Magnus"
          /> */}
          <ProfilePreviewDescription>
            <h1 className="font-display text-3xl font-medium mb-3">
              Ole Magnus Fon Johnsen
            </h1>
            <p>
              Ole Magnus er Chief Technology Officer (CTO) i selskapet, en
              dynamisk og visjonær teknologileder kjent for sin evne til å
              navigere i komplekse teknologiske landskap. Med en solid bakgrunn
              i både programvareutvikling og systemarkitektur, har Ole Magnus
              hjulpet til med å forme selskapets teknologiske vei og har vært en
              drivkraft bak dets innovasjoner.
            </p>
            <p>
              Ole Magnus har en lidenskap for teknologisk innovasjon og har
              bevist sin evne til å lede og inspirere teknologiteam til å oppnå
              banebrytende resultater. I tillegg til hans tekniske ekspertise,
              har Ole Magnus også vist seg å være en effektiv kommunikator,
              brobygger mellom tekniske og ikke-tekniske team, og en mentor for
              unge teknologitalenter.
            </p>
          </ProfilePreviewDescription>
        </ProfilePreview>
      </div>
    </>
  );
}
