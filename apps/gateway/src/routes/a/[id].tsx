import {
  action,
  cache,
  createAsync,
  redirect,
  useAction,
  useParams,
  useSearchParams,
} from "@solidjs/router";
import { For, Match, Show, Switch } from "solid-js";
import { Completed } from "~/components/completed";
import { NoHwid } from "~/components/no-hwid";
import { NotFound } from "~/components/not-found";
import { Button } from "~/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/lib/api";

const getApplication = cache(async (id: string) => {
  "use server";

  const { data: application } = await api.v1.public.application({ id }).get();
  return application;
}, "application");

const getSession = async (
  applicationId: string | number,
  hwid?: string,
  template?: number,
) => {
  "use server";

  if (!hwid) return null;

  const { data: session } = await api.v1
    .sessions({ application: applicationId })
    .index.get({ query: { hwid, [template ? "template" : ""]: template } });

  return session;
};

const processSession = async (
  applicationId: string,
  hwid?: string,
  tk?: string,
) => {
  "use server";
  if (!hwid) return null;

  await api.v1
    .sessions({ application: applicationId })
    .index.post(null, { query: { hwid, tk } });
};

const continueAction = action(
  async (applicationId: number, hwid: string, template: number) => {
    "use server";
    const session = await getSession(applicationId, hwid, template);

    if (session?.next) throw redirect(session.next);
  },
);

export default function Gateway() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const application = createAsync(() => getApplication(params.id));
  const session = createAsync(async () => {
    await processSession(params.id, searchParams.hwid, searchParams.tk);
    return getSession(params.id, searchParams.hwid);
  });

  const buttonAction = useAction(continueAction);

  return (
    <Show when={searchParams.hwid} fallback={<NoHwid />}>
      {(hwid) => (
        <Switch fallback={<NotFound />}>
          <Match when={session()?.key}>
            {(key) => <Completed key={key().id} expiresAt={key().expiresAt} />}
          </Match>
          <Match when={application()}>
            {(application) => (
              <>
                <CardHeader>
                  <CardTitle>{application().name}</CardTitle>
                  <CardSubtitle>
                    Checkpoint {session()?.checkpoint || 1} of{" "}
                    {application().checkpoints}
                  </CardSubtitle>
                  <CardDescription>
                    Choose preferred method, you may see pop-ups/ads and they
                    can be a bit annoying, but they directly support the
                    creators.
                  </CardDescription>
                </CardHeader>
                <CardContent class="flex">
                  <div class="flex flex-col px-6 w-full gap-y-2">
                    <For each={application().templates}>
                      {(item) => (
                        <Show
                          when={
                            searchParams.tpl
                              ? Number(searchParams.tpl) === item.id
                              : true
                          }
                        >
                          <Button
                            class={"w-full"}
                            variant={"outline"}
                            type="sumbit"
                            onClick={() =>
                              buttonAction(application().id, hwid(), item.id)
                            }
                          >
                            <img src={`/${item.type}.webp`} alt={item.type} />
                          </Button>
                        </Show>
                      )}
                    </For>
                  </div>
                </CardContent>
              </>
            )}
          </Match>
        </Switch>
      )}
    </Show>
  );
}
