import { useEffect, useState } from "react";
import {
saveProfile,
getProfile,
} from "../api/profile";

function ProfileForm() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [summary, setSummary] = useState("");

const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [message, setMessage] = useState("");

useEffect(() => {
async function loadProfile() {
try {
console.log("Loading profile...");

    const profile = await getProfile();


console.log(
  "Profile received:",
  profile
);

console.log(
  "Name:",
  profile?.name
);

console.log(
  "Email:",
  profile?.email
);

console.log(
  "Summary:",
  profile?.professionalSummary
);

    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setSummary(
        profile.professionalSummary ?? ""
      );
    }
  } catch (error) {
    console.error(
      "Failed to load profile:",
      error
    );

    setMessage(
      "Failed to load profile."
    );
  } finally {
    setLoading(false);
  }
}

loadProfile();

}, []);

async function handleSubmit(
e: React.SubmitEvent
) {
e.preventDefault();

setSaving(true);
setMessage("");

try {
  await saveProfile({
    name,
    email,
    professionalSummary: summary,
  });

  setMessage(
    "Profile saved successfully!"
  );
} catch (error) {
  console.error(
    "Failed to save profile:",
    error
  );

  setMessage(
    "Failed to save profile."
  );
} finally {
  setSaving(false);
}

}

if (loading) {
return <p>Loading profile...</p>;
}

return (
<form onSubmit={handleSubmit}>
<h2>Career Profile</h2>

  <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) =>
      setName(e.target.value)
    }
    required
  />
<br/><br/>
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
    required
  />
<br/><br/>
  <textarea
    placeholder="Professional Summary"
    value={summary}
    onChange={(e) =>
      setSummary(e.target.value)
    }
    rows={6}
  />
<br/><br/>
  <button
    type="submit"
    disabled={saving}
  >
    {saving
      ? "Saving..."
      : "Save Profile"}
  </button>

  {message && (
    <p>{message}</p>
  )}
</form>

);
}

export default ProfileForm;