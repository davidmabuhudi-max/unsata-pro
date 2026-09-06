import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const applicationsRef = collection(db, "applications");
const membersRef = collection(db, "members");
const auditRef = collection(db, "auditLogs");

// ======================================
// SUBMIT APPLICATION
// ======================================

export async function submitApplication(data) {
  const docRef = await addDoc(applicationsRef, {
    ...data,
    status: "Pending",
    submittedAt: serverTimestamp(),
  });

  return docRef.id;
}

// ======================================
// GET APPLICATIONS
// ======================================

export async function getApplications(status = "All") {
  const snapshot = await getDocs(
    query(
      applicationsRef,
      orderBy("submittedAt", "desc")
    )
  );

  let applications = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Hide approved applications
  applications = applications.filter(
    (app) => app.status !== "Approved"
  );

  if (status !== "All") {
    applications = applications.filter(
      (app) =>
        app.status?.toLowerCase() ===
        status.toLowerCase()
    );
  }

  return applications;
}

// ======================================
// APPROVE APPLICATION
// ======================================

export async function approveApplication(
  applicationId,
  adminUid
) {
  await runTransaction(db, async (transaction) => {
    const applicationDoc = doc(
      db,
      "applications",
      applicationId
    );

    const applicationSnap =
      await transaction.get(applicationDoc);

    if (!applicationSnap.exists()) {
      throw new Error("Application not found.");
    }

    const application =
      applicationSnap.data();

    if (application.status !== "Pending") {
      throw new Error(
        "Application has already been processed."
      );
    }

    const counterRef = doc(
      db,
      "settings",
      "memberCounter"
    );

    const counterSnap =
      await transaction.get(counterRef);

    let counter = 0;

    if (counterSnap.exists()) {
      counter =
        counterSnap.data().current || 0;
    }

    counter++;

    transaction.set(
      counterRef,
      {
        current: counter,
      },
      {
        merge: true,
      }
    );

    const year =
      new Date().getFullYear();

    const memberId = `UMC-${year}-${String(
      counter
    ).padStart(5, "0")}`;

    const memberDoc = doc(membersRef);

    transaction.set(memberDoc, {
      memberId,
      applicationId,

      fullName:
        application.fullName || "",

      gender:
        application.gender || "",

      dateOfBirth:
        application.dateOfBirth || "",

      nationalId:
        application.nationalId || "",

      university:
        application.university || "",

      campus:
        application.campus || "",

      programme:
        application.programme || "",

      registrationNumber:
        application.registrationNumber || "",

      year:
        application.year || "",

      email:
        application.email || "",

      phone:
        application.phone || "",

      region:
        application.region || "",

      district:
        application.district || "",

      passportPhoto:
        application.passportPhoto || "",

      passportPhotoId:
        application.passportPhotoId || "",

      paymentReceipt:
        application.paymentReceipt || "",

      paymentReceiptId:
        application.paymentReceiptId || "",

      paymentMethod:
        application.paymentMethod || "",

      paymentReference:
        application.paymentReference || "",

      expectations:
        application.expectations || "",

      hobbies:
        application.hobbies || "",

      skills:
        application.skills || [],

      status: "Active",

      joinedAt:
        serverTimestamp(),
    });

    transaction.update(
      applicationDoc,
      {
        status: "Approved",

        memberId,

        approvedBy:
          adminUid,

        approvedAt:
          serverTimestamp(),
      }
    );

    const auditDoc = doc(auditRef);

    transaction.set(auditDoc, {
      action:
        "APPLICATION_APPROVED",

      applicationId,

      memberId,

      adminUid,

      createdAt:
        serverTimestamp(),
    });
  });
}// ======================================
// REJECT APPLICATION
// ======================================

export async function rejectApplication(
  applicationId,
  adminUid,
  rejectionReason
) {
  if (!rejectionReason?.trim()) {
    throw new Error("Rejection reason is required.");
  }

  await updateDoc(
    doc(db, "applications", applicationId),
    {
      status: "Rejected",

      rejectionReason,

      reviewedBy: adminUid,

      rejectedBy: adminUid,

      reviewedAt: serverTimestamp(),

      rejectedAt: serverTimestamp(),

      deleteAfterDays: 30,
    }
  );

  await addDoc(auditRef, {
    action: "APPLICATION_REJECTED",

    applicationId,

    adminUid,

    rejectionReason,

    createdAt: serverTimestamp(),
  });
}

// ======================================
// DELETE APPLICATION
// ======================================

export async function deleteApplication(
  id,
  adminUid
) {
  await deleteDoc(
    doc(db, "applications", id)
  );

  await addDoc(auditRef, {
    action: "APPLICATION_DELETED",

    applicationId: id,

    adminUid,

    createdAt: serverTimestamp(),
  });
}

// ======================================
// COMMON REJECTION REASONS
// ======================================

export const REJECTION_REASONS = [

  "Passport photo is unclear.",

  "Payment receipt cannot be verified.",

  "Registration number is incorrect.",

  "University information is incorrect.",

  "Required documents are missing.",

  "Duplicate membership application.",

  "Payment reference number is invalid.",

  "Submitted information is inconsistent.",

  "Other",
];

// ======================================
// FORMAT REJECTION REASON
// ======================================

export function buildRejectionReason(
  selectedReason,
  customReason = ""
) {
  if (!selectedReason) {
    return "";
  }

  if (selectedReason === "Other") {
    return customReason.trim();
  }

  return selectedReason;
}