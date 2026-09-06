import MembershipHero from "../components/membership/MembershipHero";
import MembershipBenefits from "../components/membership/MembershipBenefits";
import MembershipPlans from "../components/membership/MembershipPlans";

export default function Membership() {
  return (
    <>
      <MembershipHero />

      <MembershipBenefits />

      <MembershipPlans />
    </>
  );
}