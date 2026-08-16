import { EmptyState, PageHeader, Panel, StatusBadge } from "@/components/admin/AdminUI";

export default function FeedbackPage() {
  return (
    <>
      <PageHeader title="💬 用户反馈" description="统一处理联系表单、工具提交、纠错建议和合作请求。" />
      <Panel title="反馈收件箱" action={<StatusBadge>等待数据库</StatusBadge>}>
        <EmptyState title="暂时没有可管理的反馈记录" description="现有联系和提交页面尚未接入持久化存储。连接 Supabase 后，这里将支持状态、标签、负责人和处理备注。" />
      </Panel>
    </>
  );
}
